import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './home/index/index.component';
import { ListComponent } from './demo/list/list.component';
import { ViewComponent } from './demo/view/view.component';
import { AddComponent } from './demo/add/add.component';
import { UpdateComponent } from './demo/update/update.component';
import { DeleteComponent } from './demo/delete/delete.component';
import { PrivacyComponent } from './home/privacy/privacy.component';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'demo/list', component: ListComponent},
  {path: 'demo/view/:id', component: ViewComponent},
  {path: 'demo/add', component: AddComponent},
  {path: 'demo/update/:id', component: UpdateComponent},
  {path: 'demo/delete/:id', component: DeleteComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'error/:msg', component: ErrorComponent},
  {path: '**', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
