/* eslint-disable */
import { HasChanges } from './Apptypes';
import { spawn } from 'child_process';

export class UnstagedChangesHandler {
  /**
   * Check for unstaged changes in the working tree
   */
  public static async hasUnstagedChanges(): Promise<HasChanges> {
    return new Promise((resolve, reject) => {
      const result = <HasChanges>{};
      const child = spawn('git', ['diff-files', '--cc'])
      child.on('exit', (code) => {
        //console.log("git diff-files exited with: " + code);
        result.code = code;
        resolve(result);
      })
      child.stdout.on('data', (data) => {
        // there is always an empty line at the end
        result.hasChanges = data.toString().split("\n").length > 1;
        //console.log(`stdout: ${data}`)
      })
      child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        reject(data.toString());
      });
    })
  }
}
