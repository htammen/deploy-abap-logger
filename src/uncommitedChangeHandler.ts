import { HasChanges } from './Apptypes';
import { spawn } from 'child_process';

export class CommitChangeHandler {
  /**
   * Check for uncommited changes in the index
   */
  public static async hasUncommitedChanges(): Promise<HasChanges> {
    return new Promise((resolve, reject) => {
      const result = <HasChanges>{};
      const child = spawn('git', ['diff-index', '--cached', 'HEAD']);
      child.on('exit', (code) => {
        //console.log("git diff-files exited with: " + code);
        result.code = code;
        resolve(result);
      })
      child.stdout.on('data', (data: object) => {
        // there is always an empty line at the end
        /* eslint-disable */
        result.hasChanges = data.toString().split("\n").length > 1;
        //console.log(`stdout: ${data}`)
      })
      child.stderr.on('data', data => {
        console.error(`stderr: ${data}`);
        /* eslint-disable */
        reject(data.toString());
      });
    })
  }
}
