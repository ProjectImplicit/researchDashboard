import messages from 'utils/messagesComponent';

export default copyUrl;

let copyUrl = study => () => {
    messages.alert({
        header: 'Copy URL',
        content: m.component(copyComponent, {study}),
        okText: 'Done'
    });
};

let copyComponent = {
    controller: ({study}) => {
        let copyFail = m.prop(false);
        let autoCopy = () => copy(study).catch(() => copyFail(true)).then(m.redraw);
        return {autoCopy, copyFail};
    },
    view: ({autoCopy, copyFail}, study) => m('.card-block', [
        m('.form-group', [
            m('label', 'Copy Url by clicking Ctrl + C, or click the copy button.'),
            m('label.input-group',[
                m('.input-group-addon', {onclick: autoCopy}, m('i.fa.fa-fw.fa-copy')),
                m('input.form-control', { config: el => el.select(), value: study.base_url })
            ]),
            !copyFail() ? '' : m('small.text-muted', 'Auto copy will not work on your browser, you need to manually copy this url')
        ])
    ])
};

function copy(text){
    return new Promise((resolve, reject) => {
        let input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();

        try {
            document.execCommand('copy');
        } catch(err){
            reject(err);
        }

        input.parentNode.removeChild(input);
    });
}
