import { toggle_tag_to_study, add_tag, get_tags_for_study} from '../tags/tagsModel';
export default args => m.component(studyTagsComponent, args);

let studyTagsComponent = {
    controller({study_id}){
        let tagName = m.prop('');
        let tags = m.prop([]);
        let loaded = m.prop(false);
        let error = m.prop(null);

        get_tags_for_study(study_id)
            .then(response => tags(response.tags))
            .catch(error)
            .then(loaded.bind(null, true))
            .then(m.redraw);

        return {tagName, tags, loaded, error};
    },
    view: ({tagName, tags, loaded, error}, {study_id, callback}) => m('div', [
        m('.input-group.m-b-1', [
            m('input.form-control', {
                placeholder: 'Filter Tags',
                value: tagName(),
                oninput: m.withAttr('value', tagName)
            }),
            m('span.input-group-btn', [
                m('button.btn.btn-secondary', {onclick: create_tag(study_id, tagName, tags), disabled: !tagName()}, [
                    m('i.fa.fa-plus'),
                    ' Create New'
                ])
            ])
        ]),

        loaded() ? '' : m('.loader'),
        error() ? m('.alert.alert-warning', error().message): '',
        loaded() && !tags().length ? m('.alert.alert-info', 'You have no tags yet') : '',

        m('.custom-controls-stacked.pre-scrollable', tags().sort(sort_tags).filter(filter_tags(tagName())).map(tag => m('label.custom-control.custom-checkbox', [
            m('input.custom-control-input', {
                type: 'checkbox',
                checked: tag.used,
                onclick: function(){
                    tag.used = !tag.used;
                    toggle_tag_to_study(study_id, tag.id, tag.used).then(callback);
                }
            }), 
            m('span.custom-control-indicator'),
            m('span.custom-control-description.m-l-1.study-tag',{style: {'background-color': '#' + tag.color}}, tag.text)
        ])))
    ])
};

function filter_tags(val){return tag => tag.text.indexOf(val) !== -1;}
function sort_tags(tag_1, tag_2){return tag_1.text.toLowerCase() === tag_2.text.toLowerCase() ? 0 : tag_1.text.toLowerCase() > tag_2.text.toLowerCase() ? 1 : -1;}       

function create_tag(study_id, tagName, tags){
    return () => add_tag(tagName(), 'E7E7E7')
        .then(response => tags().push(response))
        .then(tagName.bind(null, ''))
        .then(m.redraw);
}
