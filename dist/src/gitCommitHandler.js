"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitCommitHandler = void 0;
const unstagedChangesHandler_1 = require("./unstagedChangesHandler");
const uncommitedChangeHandler_1 = require("./uncommitedChangeHandler");
const child_process_1 = require("child_process");
class GitCommitHandler {
    /**
     * get information about current commit
     */
    static async getGitCommitInfo() {
        try {
            const messages = [];
            const hasUnstaged = await unstagedChangesHandler_1.UnstagedChangesHandler.hasUnstagedChanges();
            if (hasUnstaged.hasChanges) {
                messages.push({ hash: '', title: 'deployed with unstaged changes' });
            }
            const hasUncommited = await uncommitedChangeHandler_1.CommitChangeHandler.hasUncommitedChanges();
            if (hasUncommited.hasChanges) {
                messages.push({ hash: '', title: 'deployed with uncommited changes' });
            }
            const commitPromise = new Promise((resolve, reject) => {
                let result;
                const child = (0, child_process_1.spawn)('git', ['log', '--pretty=oneline', '-1']);
                child.on('exit', (code) => {
                    const msg = { hash: result.hash, title: result.title };
                    /* eslint-disable */
                    resolve(msg);
                });
                child.stdout.on('data', (data) => {
                    const lData = data.toString().replace('\n', '');
                    const arrData = lData.split(' ');
                    const commitHash = arrData[0];
                    const commitTitle = arrData.reduce((acc, cur, idx) => {
                        if (idx > 0) {
                            return acc.concat(cur).concat(' ');
                        }
                        return acc;
                    }, '');
                    result = { hash: commitHash, title: commitTitle.trimEnd() };
                });
                child.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                    reject(data.toString());
                });
            });
            const commitMsgs = await commitPromise;
            messages.push(commitMsgs);
            return messages;
        }
        catch (ex) {
            console.log(`there seems to be no git commit in this repo.\n${ex}`);
            return [{ hash: '', title: 'something went wrong when checking unstaged changes in git repo' }];
        }
    }
}
exports.GitCommitHandler = GitCommitHandler;
