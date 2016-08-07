import folder from './folderComponent';
import classNames from 'utils/classNames';
import fileContext from './fileContext';
import {uploadConfig} from 'utils/uploader';
import {uploadFiles} from './fileActions';

export default node;

let node = (args) => m.component(nodeComponent, args);

let nodeComponent = {
    controller: ({file}) => {
        return {
            isCurrent: m.route.param('fileID') === file.id
        };
    },
    view: (ctrl, {file,folderHash, study}) => {
        let vm = study.vm(file.id); // vm is created by the studyModel
        return m('li.file-node',
            {
                key: file.id,
                class: classNames({
                    open : vm.isOpen()
                }),
                onclick: file.isDir ? () => vm.isOpen(!vm.isOpen()) : select(file),
                oncontextmenu: fileContext(file, study),
                config: file.isDir ? uploadConfig({onchange:uploadFiles(file.path, study)}) : null
            },
            [
                m('a.wholerow', {
                    unselectable:'on',
                    class:classNames({
                        'current': ctrl.isCurrent
                    })
                }, m.trust('&nbsp;')),
                m('i.fa.fa-fw', {
                    class: classNames({
                        'fa-caret-right' : file.isDir && !vm.isOpen(),
                        'fa-caret-down': file.isDir && vm.isOpen()
                    })
                }),

                m('a', {class:classNames({'text-primary': /\.expt\.xml$/.test(file.name)})}, [
                    // checkbox
                    m('i.fa.fa-fw', {
                        onclick: choose({file,study}),
                        class: classNames({
                            'fa-check-square-o': vm.isChosen() === 1,
                            'fa-square-o': vm.isChosen() === 0,
                            'fa-minus-square-o': vm.isChosen() === -1
                        })
                    }),

                    // icon
                    m('i.fa.fa-fw.fa-file-o', {
                        class: classNames({
                            'fa-file-code-o': /(js)$/.test(file.type),
                            'fa-file-text-o': /(jst|html|xml)$/.test(file.type),
                            'fa-file-image-o': /(jpg|png|bmp)$/.test(file.type),
                            'fa-file-pdf-o': /(pdf)$/.test(file.type),
                            'fa-folder-o': file.isDir
                        })
                    }),
                    m('span',{class:classNames({'font-weight-bold':file.hasChanged()})},` ${file.name}`),
                    file.isDir ? folder({path: file.path + '/', folderHash, study}) : ''
                ])
            ]
        );
    }
};

// select specific file and display it
let select = (file) => e => {
    e.stopPropagation();
    e.preventDefault();
    m.route(`/editor/${file.studyId}/file/${encodeURIComponent(file.id)}`);
};

// checkmark a file/folder
let choose = ({file, study}) => e => {
    e.stopPropagation();
    e.preventDefault();

    let lastState = isChosen(file)();

    // mark decendents (and the file itself
    study
        .getChildren(file)
        .forEach(f => isChosen(f)(lastState === 1 ? 0 : 1)); // update vm for each child

    // update parent folders
    study
        .getParents(file)
        .sort((a,b) => a.path.length === b.path.length ? 0 : a.path.length < b.path.length ? 1 : -1)
        .forEach(f => {
            let files = f.files || [];
            let chosenCount = files.reduce((counter, f) => counter + isChosen(f)(), 0);
            isChosen(f)(chosenCount === 0 ? 0 : chosenCount === files.length ? 1 : -1);
        });

    function isChosen(file){
        return study.vm(file.id).isChosen;
    }
};
