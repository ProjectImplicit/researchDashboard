import studiesComponent from './study/studiesComponent';
import shared_with_me_component from './study/studiesComponent2';
import statisticsComponent from './study/statistics/statisticsComponent';
import studyComponent from './study/studyComponent';
import poolComponent from './pool/poolComponent';
import historyComponent from './pool/historyComponent';
import downloadsComponent from './downloads/downloadsComponent';
import downloadsAccessComponent from './downloadsAccess/downloadsAccessComponent';
import loginComponent from './login/loginComponent';
import deployListComponent from './deployList/deployListComponent';
import changeRequestListComponent from './changeRequestList/changeRequestListComponent';
import removalListComponent from './removalList/removalListComponent';
import deployComponent from './deploy/deployComponent';
import studyRemovalComponent from './studyRemoval/studyRemovalComponent';
import studyChangeRequestComponent from './studyChangeRequest/studyChangeRequestComponent';
import addUserComponent from './addUser/addUserComponent';
import activationComponent from './activation/activationComponent';
import changePasswordComponent from './changePassword/changePasswordComponent';
import recoveryComponent from './recovery/recoveryComponent';
import collaborationComponent from './collaboration/collaborationComponent';
export default routes;

let routes = { 
    '/recovery':  recoveryComponent,
    '/activation/:code':  activationComponent,
    '/change_password':  changePasswordComponent,
    '/change_password/:code':  changePasswordComponent,
    '/addUser':  addUserComponent,
    '/studyChangeRequest/:studyId':  studyChangeRequestComponent,
    '/studyRemoval/:studyId':  studyRemovalComponent,
    '/deploy/:studyId': deployComponent,
    '/deployList': deployListComponent,
    '/removalList': removalListComponent,
    '/changeRequestList': changeRequestListComponent,
    '/login': loginComponent,
    '/studies' : studiesComponent,
    '/studies/statistics' : statisticsComponent,
    '/studies/shared_with_me' : shared_with_me_component,

    '/editor/:studyId': studyComponent,
    '/editor/:studyId/:resource/:fileID': studyComponent,
    '/pool': poolComponent,
    '/pool/history': historyComponent,
    '/downloads': downloadsComponent,
    '/downloadsAccess': downloadsAccessComponent,
    '/collaboration/:studyId': collaborationComponent
};

