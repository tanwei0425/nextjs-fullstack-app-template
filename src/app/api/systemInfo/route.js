
import { NextResponse, } from 'next/server';


export async function GET() {
    const os = require('os')
    const { execSync } = require('child_process')
    const platform = os.platform();
    const arch = os.arch();
    const totalmem = os.totalmem() / 1024 / 1024;
    const freemem = os.freemem() / 1024 / 1024;
    const hostname = os.hostname();
    const release = execSync('sw_vers -productVersion', { encoding: 'utf-8' });
    const cpus = os.cpus();
    console.log(cpus, 'cpus');
    const data = {
        freemem,
        totalmem,
        hostname,
        arch,
        release,
        cpu: cpus[0].model,
        platform,
    }
    switch (platform) {
        case 'darwin':
            data.platform = 'macOS'
            break;
        case 'win32':
            data.platform = 'Windows'
            break;
        default:
            break;
    }
    return NextResponse.json({
        status: 200,
        data,
        msg: '操作成功'
    });
}