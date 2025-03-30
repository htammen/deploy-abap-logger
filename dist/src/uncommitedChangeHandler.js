"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitChangeHandler = void 0;
const child_process_1 = require("child_process");
class CommitChangeHandler {
    /**
     * Check for uncommited changes in the index
     */
    static async hasUncommitedChanges() {
        return new Promise((resolve, reject) => {
            const result = {};
            const child = (0, child_process_1.spawn)('git', ['diff-index', '--cached', 'HEAD']);
            child.on('exit', (code) => {
                //console.log("git diff-files exited with: " + code);
                result.code = code;
                resolve(result);
            });
            child.stdout.on('data', (data) => {
                // there is always an empty line at the end
                /* eslint-disable */
                result.hasChanges = data.toString().split("\n").length > 1;
                //console.log(`stdout: ${data}`)
            });
            child.stderr.on('data', data => {
                console.error(`stderr: ${data}`);
                /* eslint-disable */
                reject(data.toString());
            });
        });
    }
}
exports.CommitChangeHandler = CommitChangeHandler;
