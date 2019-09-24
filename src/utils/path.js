import { join } from 'path';
import { projectPath } from '../config/app';

export const getPublicPath = (path = '') => join(projectPath, 'publicPath', path);

export const getResourcesPath = (path = '') => join(projectPath, 'resources', path);

export const getViewsPath = (path = '') => join(getResourcesPath('views'), path);

export const getSassPath = (path = '') => join(getResourcesPath('sass'), path);

export const getJsPath = (path = '') => join(getResourcesPath('js'), path);

export const getLangPath = (path = '') => join(getResourcesPath('js'), path);
