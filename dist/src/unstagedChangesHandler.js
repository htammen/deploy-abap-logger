"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnstagedChangesHandler = void 0;
const child_process_1 = require("child_process");
class UnstagedChangesHandler {
    /**
     * Check for unstaged changes in the working tree
     */
    static async hasUnstagedChanges() {
        return new Promise((resolve, reject) => {
            const result = {};
            const child = (0, child_process_1.spawn)('git', ['diff-files', '--cc']);
            child.on('exit', (code) => {
                //console.log("git diff-files exited with: " + code);
                result.code = code;
                resolve(result);
            });
            child.stdout.on('data', (data) => {
                // there is always an empty line at the end
                result.hasChanges = data.toString().split("\n").length > 1;
                //console.log(`stdout: ${data}`)
            });
            child.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
                reject(data.toString());
            });
        });
    }
}
exports.UnstagedChangesHandler = UnstagedChangesHandler;
