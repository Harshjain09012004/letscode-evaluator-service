import CppExecutor from "../containers/cppExecutor";
import JavaExecutor from "../containers/javaExecutor";
import PythonExecutor from "../containers/pythonExecutor";
import CodeExecutorStrategy from "../types/codeExecutorStrategy";

function createExecutor(codeLanguage : string) : CodeExecutorStrategy | null{
    if(codeLanguage.toUpperCase() == 'CPP'){
        return new CppExecutor();
    }
    else if(codeLanguage.toUpperCase() == 'JAVA'){
        return new JavaExecutor();
    }
    else if(codeLanguage.toUpperCase() == 'PYTHON'){
        return new PythonExecutor();
    }
    else{
        return null;
    }
};

export default createExecutor;