import { GitCommit } from '../src/Apptypes';
import { GitCommitHandler } from '../src/gitCommitHandler';

export default class TestGitCommitHandler {

  async main() {
    const commitInfo = await GitCommitHandler.getGitCommitInfo();
    console.log('Test OUTPUT:\n');
    commitInfo.forEach((commitInfo: GitCommit) => { console.log('commit: %s, info: %s', commitInfo.commit, commitInfo.info) });
  }

}

const testGitCommitHandler = new TestGitCommitHandler();
testGitCommitHandler.main();
