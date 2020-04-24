import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: 'home',
		loadChildren: () =>
			import('./pages/home/home.module').then(m => m.HomePageModule)
	},
	{
		path: 'create-project',
		loadChildren: () =>
			import('./pages/create-project/create-project.module').then(
				m => m.CreateProjectPageModule
			)
	},
	{
		path: 'clients',
		loadChildren: () =>
			import('./pages/clients/clients.module').then(m => m.ClientsPageModule)
	},
	{
		path: 'project/:id',
		loadChildren: () =>
			import('./pages/project/project.module').then(m => m.ProjectDetailModule)
	},
	{
		path: 'image-display',
		loadChildren: () =>
			import('./modals/image-display/image-display.module').then(
				m => m.ImageDisplayModalPageModule
			)
	},
	{
		path: 'todo-list',
		loadChildren: () =>
			import('./modals/todo-list/todo-list.module').then(
				m => m.TodoListPageModule
			)
	},
	{
		path: 'calendar',
		loadChildren: () =>
			import('./modals/calendar/calendar.module').then(
				m => m.CalendarPageModule
			)
	},
	{
		path: 'event-modal',
		loadChildren: () =>
			import('./modals/event-modal/event-modal.module').then(
				m => m.EventModalModule
			)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
