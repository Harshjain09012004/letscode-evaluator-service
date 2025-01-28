/* eslint-disable no-unused-vars */

import DockerStreamOutput from "./dockerStreamOutput";

interface CodeExecutorStrategy {
    execute : (code: string, inputTestCases: string) => Promise<DockerStreamOutput>;
};

export default CodeExecutorStrategy;