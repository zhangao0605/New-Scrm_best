import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';




registerLocaleData(zh);
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Observable, of} from 'rxjs'
import {FormsModule} from '@angular/forms';


import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {TaskComponent} from './task/task.component';
import {HttpRequestService} from "./task/http-request.service";
import {TaskchedulerserviceService} from "./taskscheduler/taskchedulerservice.service";
import {TaskschedulerComponent} from "./taskscheduler/taskscheduler.component";
import {CustomermanagementComponent} from './customermanagement/customermanagement.component';
import {CustomermanagementService} from "./customermanagement/customermanagement.service";
import {AddressbookmanagementComponent} from './addressbookmanagement/addressbookmanagement.component';
import {AddressbookmanagementserviveService} from "./addressbookmanagement/addressbookmanagementservive.service";
import {LabelmanagementComponent} from './labelmanagement/labelmanagement.component';
import {LabelmanagementserviveService} from "./labelmanagement/labelmanagementservive.service";
import {MaterialmanagementComponent} from './materialmanagement/materialmanagement.component';
import {MaterialmanagementserviveService} from "./materialmanagement/materialmanagementservive.service";
import {GroupmanagementComponent} from './groupmanagement/groupmanagement.component';
import {GroupmanagementserviveService} from "./groupmanagement/groupmanagementservive.service";
import {HomeserviveService} from "./home/homeservive.service";
import {FriendcirclemanagementComponent} from './friendcirclemanagement/friendcirclemanagement.component';
import {PublicnumbermanagementComponent} from './publicnumbermanagement/publicnumbermanagement.component';
import {FriendcirclemanagementserviceService} from "./friendcirclemanagement/friendcirclemanagementservice.service";
import {PublicnumbermanagementserviceService} from "./publicnumbermanagement/publicnumbermanagementservice.service";
import {GroupingmanagementComponent} from './groupingmanagement/groupingmanagement.component';
import {GroupingmanagementserviceService} from "./groupingmanagement/groupingmanagementservice.service";
import {NavbarServiceService} from "./navbar/navbar-service.service";
import {TasktemplateComponent} from './tasktemplate/tasktemplate.component';
import {TasktemplateserveService} from "./tasktemplate/tasktemplateserve.service";
import {SocialnumbermanagementComponent} from './socialnumbermanagement/socialnumbermanagement.component';
import {SocialnumberservicemanagementService} from "./socialnumbermanagement/socialnumberservicemanagement.service";
import {LoginComponent} from './login/login.component';
import {LoginServiceService} from "./login/login-service.service";

/*------------------------------滴滴滴---------------------------------*/
import {MaskComponent} from './mask/mask.component';

import {CustomerstatisticsComponent} from './customerstatistics/customerstatistics.component';

import {DevicemanagementComponent} from './devicemanagement/devicemanagement.component';

import {GeneralstatisticsComponent} from './generalstatistics/generalstatistics.component';

import {JurisdictionComponent} from './jurisdiction/jurisdiction.component';

import {RolemanagementComponent} from './jurisdiction/rolemanagement/rolemanagement.component';

import {MarketstatisticsComponent} from './marketstatistics/marketstatistics.component';

import {PhonemanagementComponent} from './phonemanagement/phonemanagement.component';

import {ResoursestatisticsComponent} from './resoursestatistics/resoursestatistics.component';

import {SocialmanagementComponent} from './socialmanagement/socialmanagement.component';

import {SystemComponent} from './system/system.component';

import {SystembulletinComponent} from './systembulletin/systembulletin.component';

import {TaskstatisticsComponent} from './taskstatistics/taskstatistics.component';


import {MaintainComponent} from './maintain/maintain.component';
import {InstallapkComponent} from './maintain/installapk/installapk.component';
import {ClearpowderComponent} from './maintain/clearpowder/clearpowder.component';
import {UpgradeplugComponent} from './maintain/upgradeplug/upgradeplug.component';


import {OperateComponent} from './operate/operate.component';
import {CirclegiveComponent} from './operate/circlegive/circlegive.component';
import {FollownumberComponent} from './operate/follownumber/follownumber.component';
import {ForwardcircleComponent} from './operate/forwardcircle/forwardcircle.component';
import {GrouppicturesComponent} from './operate/grouppictures/grouppictures.component';
import {PullgroupComponent} from './operate/pullgroup/pullgroup.component';
import {ScavengingComponent} from './operate/scavenging/scavenging.component';
import {SendlinkComponent} from './operate/sendlink/sendlink.component';
import {SendcircleComponent} from './operate/sendcircle/sendcircle.component';


import {PersonificationComponent} from './personification/personification.component';
import {BrowsegralinkComponent} from './personification/browsegralink/browsegralink.component';
import {FridentcircleComponent} from './personification/fridentcircle/fridentcircle.component';
import {SeewalletComponent} from './personification/seewallet/seewallet.component';
import {SeemaillistComponent} from './personification/seemaillist/seemaillist.component';
import {SubscribenumberComponent} from './personification/subscribenumber/subscribenumber.component';
import {TencentnewsComponent} from './personification/tencentnews/tencentnews.component';
import {UnreadmessageComponent} from './personification/unreadmessage/unreadmessage.component';
import {ViewAlbumComponent} from './personification/viewalbum/viewalbum.component';


import {TokerComponent} from './toker/toker.component';
import {AcceptfriendComponent} from './toker/acceptfriend/acceptfriend.component';
import {AccurateaddComponent} from './toker/accurateadd/accurateadd.component';
import {EnterthegroupComponent} from './toker/enterthegroup/enterthegroup.component';
import {MaillistComponent} from './toker/maillist/maillist.component';
import {PeoplenearbyComponent} from './toker/peoplenearby/peoplenearby.component';
import {PhoneaddComponent} from './toker/phoneadd/phoneadd.component';
import {PositioncrossingComponent} from './toker/positioncrossing/positioncrossing.component';
import {RemotedataComponent} from './toker/remotedata/remotedata.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'task', component: TaskComponent},
  {path: 'toker', component: TokerComponent},
  {path: 'friendcircle', component: FriendcirclemanagementComponent},
  {path: 'socialnumber', component: SocialnumbermanagementComponent},
  {path: 'publicnumber', component: PublicnumbermanagementComponent},
  {path: 'tasktemplate', component: TasktemplateComponent},
  {path: 'grouping', component: GroupingmanagementComponent},
  {path: 'taskscheduler', component: TaskschedulerComponent},
  {path: 'customermanagement', component: CustomermanagementComponent},
  {path: 'groupmanagement', component: GroupmanagementComponent},
  {path: 'addressbookmanagement', component: AddressbookmanagementComponent},
  {path: 'materialmanagement', component: MaterialmanagementComponent},
  {path: 'labelmanagement', component: LabelmanagementComponent},
  /*----------------------------------------------------------------------*/
  {path: 'customerstatistics', component: CustomerstatisticsComponent},
  {path: 'devicemanagement', component: DevicemanagementComponent},
  {path: 'generalstatistics', component: GeneralstatisticsComponent},
  {path: 'jurisdiction', component: JurisdictionComponent},
  {path: 'rolemanagement', component: RolemanagementComponent},
  {path: 'marketstatistics', component: MarketstatisticsComponent},
  {path: 'phonemanagement', component: PhonemanagementComponent},
  {path: 'resoursestatistics', component: ResoursestatisticsComponent},
  {path: 'socialmanagement', component: SocialmanagementComponent},
  {path: 'system', component: SystemComponent},
  {path: 'systembulletin', component: SystembulletinComponent},
  {path: 'taskstatistics', component: TaskstatisticsComponent},
  {path: 'maintain', component: MaintainComponent},
  {path: 'installapk', component: InstallapkComponent},
  {path: 'clearpowder', component: ClearpowderComponent},
  {path: 'upgradeplug', component: UpgradeplugComponent},
  {path: 'operate', component: OperateComponent},
  {path: 'circlegive', component: CirclegiveComponent},
  {path: 'follownumber', component: FollownumberComponent},
  {path: 'forwardcircle', component: ForwardcircleComponent},
  {path: 'grouppictures', component: GrouppicturesComponent},
  {path: 'pullgroup', component: PullgroupComponent},
  {path: 'scavenging', component: ScavengingComponent},
  {path: 'sendcircle', component: SendcircleComponent},
  {path: 'sendlink', component: SendlinkComponent},
  {path: 'personification', component: PersonificationComponent},
  {path: 'browsegralink', component: BrowsegralinkComponent},
  {path: 'fridentcircle', component: FridentcircleComponent},
  {path: 'seewallet', component: SeewalletComponent},
  {path: 'seemaillist', component: SeemaillistComponent},
  {path: 'subscribenumber', component: SubscribenumberComponent},
  {path: 'tencentnews', component: TencentnewsComponent},
  {path: 'unreadmessage', component: UnreadmessageComponent},
  {path: 'viewalbum', component: ViewAlbumComponent},
  {path: 'toker', component: TokerComponent},
  {path: 'acceptfriend', component: AcceptfriendComponent},
  {path: 'accurateadd', component: AccurateaddComponent},
  {path: 'enterthegroup', component: EnterthegroupComponent},
  {path: 'maillist', component: MaillistComponent},
  {path: 'peoplenearby', component: PeoplenearbyComponent},
  {path: 'phoneadd', component: PhoneaddComponent},
  {path: 'positioncrossing', component: PositioncrossingComponent},
  {path: 'remotedata', component: RemotedataComponent},


]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TokerComponent,
    OperateComponent,
    PersonificationComponent,
    MaintainComponent,
    AccurateaddComponent,
    MaillistComponent,
    EnterthegroupComponent,
    PositioncrossingComponent,
    RemotedataComponent,
    PhoneaddComponent,
    PeoplenearbyComponent,
    AcceptfriendComponent,
    GrouppicturesComponent,
    SendlinkComponent,
    SendcircleComponent,
    ForwardcircleComponent,
    CirclegiveComponent,
    PullgroupComponent,
    FollownumberComponent,
    ScavengingComponent,
    ClearpowderComponent,
    UpgradeplugComponent,
    InstallapkComponent,
    SystemComponent,
    UnreadmessageComponent,
    SubscribenumberComponent,
    SeewalletComponent,
    TencentnewsComponent,
    FridentcircleComponent,
    SeemaillistComponent,
    ViewAlbumComponent,
    BrowsegralinkComponent,
    JurisdictionComponent,
    DevicemanagementComponent,
    SocialmanagementComponent,
    PhonemanagementComponent,
    GeneralstatisticsComponent,
    TaskstatisticsComponent,
    MarketstatisticsComponent,
    CustomerstatisticsComponent,
    ResoursestatisticsComponent,
    HomeComponent,
    TaskComponent,
    TaskschedulerComponent,
    CustomermanagementComponent,
    AddressbookmanagementComponent,
    LabelmanagementComponent,
    MaterialmanagementComponent,
    GroupmanagementComponent,
    FriendcirclemanagementComponent,
    PublicnumbermanagementComponent,
    GroupingmanagementComponent,
    TasktemplateComponent,
    SocialnumbermanagementComponent,
    LoginComponent,
    SystembulletinComponent,
    RolemanagementComponent,
    MaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(routes),
    FormsModule,


  ],
  providers: [HttpRequestService, TaskchedulerserviceService, CustomermanagementService, AddressbookmanagementserviveService, LabelmanagementserviveService, MaterialmanagementserviveService, GroupmanagementserviveService, HomeserviveService, FriendcirclemanagementserviceService, PublicnumbermanagementComponent, GroupingmanagementserviceService, NavbarServiceService, TasktemplateserveService, SocialnumberservicemanagementService, LoginServiceService, PublicnumbermanagementserviceService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
