import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { BodyContainerComponent } from './components/layout/body-container/body-container.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { ActiveTaskComponent } from './components/layout/active-task/active-task.component';
import { CompletedTaskComponent } from './components/layout/completed-task/completed-task.component';
import { authGuard } from './guards/auth.guard';
import { PendingTaskComponent } from './components/layout/pending-task/pending-task.component';

export const routes: Routes = [
    {
        component: AuthComponent,
        path: '',
    },
    {
        component: BodyContainerComponent,
        path: '',
        canActivate:[authGuard],
        children: [
            {
                canActivate:[authGuard],
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                canActivate:[authGuard],
                path: 'active',
                component: ActiveTaskComponent
            },
            {
                canActivate:[authGuard],
                path: 'completed',
                component: CompletedTaskComponent
            },
            {
                canActivate:[authGuard],
                path: 'pending',
                component: PendingTaskComponent
            }
        ]
    }
];
