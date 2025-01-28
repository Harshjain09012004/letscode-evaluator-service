import CppExecutor from "../containers/cppExecutor";
import JavaExecutor from "../containers/javaExecutor";
import PythonExecutor from "../containers/pythonExecutor";
import CodeExecutorStrategy from "../types/codeExecutorStrategy";

function createExecutor(codeLanguage : string) : CodeExecutorStrategy | null{
    if(codeLanguage == 'CPP'){
        return new CppExecutor();
    }
    else if(codeLanguage == 'JAVA'){
        return new JavaExecutor();
    }
    else if(codeLanguage == 'PYTHON'){
        return new PythonExecutor();
    }
    else{
        return null;
    }
};

export default createExecutor;