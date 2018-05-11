import apptEcossystem from '@appt/core/appt.ecosystem';
import { Router } from 'express';
import apptApi from './appt.api';

import EventEmitter from "events";

class ApptRoute {
  constructor(route, use, target){    
    this.path = route.path;
    this.components = use;
    this.target = target;
  }
}

class RouterChain {
  constructor(){
    this.list = [];
  }

  add(route, use, target){    
    if(!this.list.some(item => item.target === target)){
      const apptRoute = new ApptRoute(route, use, target);
      this.list.push(apptRoute);
    }    
  }

  getPathByTarget(target){
    return new Promise((resolve, reject) => {    
      const route = this.list.find(route => target === route.target);      
      
      this.buildChain(route, completePath => {        
        resolve(completePath.map(target => target.path).join(''))
      });
    })
  }

  buildChain(route, cb, routes = []){    
    if(route){
      routes.unshift(route);
      
      const parent = this.getParentRoute(route.target);
      
      return this.buildChain(parent, cb, routes);
    } else {
      return cb(routes)
    }
  }

  getRoute(route){
    return this.list.find(item => item.target === route);
  }

  getParentRoute(route){    
    return this.list.find(item => {            
      return item.components && item.components.length > 0 && item.components.some(component => {          
        return component === route
      })
    });
  }
}

class ApptRouterSystem {
  constructor(){    
    this.api = apptApi.getInstance();
    this.routerChain = new RouterChain();
    this.ready = [];
  }

  isReady(route){
    return new Promise(resolve => {
      this.ready.push(new EventEmitter());

      return this.ready[this.ready.length - 1].on('complete', () => {        
        return this.routerChain.getPathByTarget(route)
          .then(basePath => {
            const router = Router();
            this.api.use(basePath, router);

            resolve(router)
          });         
      })
    })
  }

  addBasePath(route, use, target){    
    return new Promise(resolve => {          
      
      this.routerChain.add(route, use, target);      
      
      resolve();
    })    
  }
}

export const apptRouterSystem = new ApptRouterSystem();

export default class TRouter {
  constructor(){}

  exec(base, use, Target, injectables) {
    return apptRouterSystem.addBasePath(base, use, Target.name)
      .then(res => {
        if(injectables && injectables.length > 0){
          return new Target(...injectables)
        } else {
          return new Target()
        }
      })
  }
}