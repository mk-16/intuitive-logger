export function mapParams(params: string[]) {
    return params.map(param =>
        param.includes('{') ?
            param.split('{')[1].trim() :
            param.includes('}') ?
                param.split('}')[0].trim() :
                param.includes('[') ?
                    param.split('[')[1].trim() :
                    param.includes(']') ?
                        param.split(']')[0].trim() :
                        param.includes('...') ?
                            param.split('...')[1].trim() :
                            param
    );
}