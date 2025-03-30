/* eslint-disable */
import { GitCommit } from './Apptypes';
import { UnstagedChangesHandler } from './unstagedChangesHandler';
import { CommitChangeHandler } from './uncommitedChangeHandler';
import { spawn } from 'child_process';

export class GitCommitHandler {
  /** 
   * get information about current commit 
   */
  public static async getGitCommitInfo(): Promise<GitCommit[]> {
    try {
      const messages: GitCommit[] = [];
      const hasUnstaged = await UnstagedChangesHandler.hasUnstagedChanges()
      if (hasUnstaged.hasChanges) {
        messages.push({ hash: '', title: 'deployed with unstaged changes' });
      }
      const hasUncommited = await CommitChangeHandler.hasUncommitedChanges();
      if (hasUncommited.hasChanges) {
        messages.push({ hash: '', title: 'deployed with uncommited changes' });
      }
      const commitPromise = new Promise((resolve, reject) => {
        let result: { hash: string, title: string };
        const child = spawn('git', ['log', '--pretty=oneline', '-1']);
        child.on('exit', (code) => {
          const msg: GitCommit = { hash: result.hash, title: result.title };
          /* eslint-disable */
          resolve(msg);
        })
        child.stdout.on('data', (data) => {
          const lData: string = data.toString().replace('\n', '');
          const arrData = lData.split(' ');
          const commitHash = arrData[0];
          const commitTitle = arrData.reduce((acc, cur, idx) => {
            if (idx > 0) {
              return acc.concat(cur).concat(' ');
            }
            return acc;
          }, '');
          result = { hash: commitHash, title: commitTitle.trimEnd() };
        })
        child.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
          reject(data.toString());
        });
      })
      const commitMsgs = <GitCommit>await commitPromise;
      messages.push(commitMsgs);
      return messages;
    } catch (ex) {
      console.log(`there seems to be no git commit in this repo.\n${ex}`)
      return [{ hash: '', title: 'something went wrong when checking unstaged changes in git repo' }]
    }
  }
}


