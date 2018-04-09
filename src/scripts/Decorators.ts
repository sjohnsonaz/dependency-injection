import ParameterInfo from './ParameterInfo';

const key = '_injection_params';

export function inject<T>(type: any) {
    return function (target: any, propertyKey: string, parameterIndex: number): any {
        if (!target[key]) {
            target[key] = new ParameterInfo(parameterIndex, type);
        } else {
            target[key].add(parameterIndex, type);
        }
    }
}

export function injectable<T extends new (...args: any[]) => any>(Constructor: T): any {
    return class extends Constructor {
        constructor(...args: any[]) {
            super(...(Constructor[key] ? Constructor[key].getArgs(args) : args));
        }
    }
}