"use strict";(self.webpackChunkcurso_componentesyservicios=self.webpackChunkcurso_componentesyservicios||[]).push([[767],{7767:(m,i,r)=>{r.r(i),r.d(i,{CategoryModule:()=>y});var d=r(6895),n=r(3128),u=r(3900),e=r(8256),a=r(9531),p=r(3417);const l=[{path:":id",component:(()=>{class t{constructor(o,c){this.route=o,this.productsService=c,this.categoryId=null,this.products=[],this.limit=10,this.offset=0,this.productId=null}ngOnInit(){this.route.paramMap.pipe((0,u.w)(o=>(this.categoryId=o.get("id"),this.categoryId?this.productsService.getByCategory(this.categoryId,this.limit,this.offset):[]))).subscribe(o=>{this.products=o}),this.route.queryParamMap.subscribe(o=>{this.productId=o.get("product"),console.log(this.productId)})}onLoadMore(){this.categoryId&&this.productsService.getByCategory(this.categoryId,this.limit,this.offset).subscribe(o=>{this.products=this.products.concat(o),this.offset+=this.limit})}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(n.gz),e.Y36(a.s))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-category"]],decls:1,vars:2,consts:[[3,"productId","products","loadMore"]],template:function(o,c){1&o&&(e.TgZ(0,"app-products",0),e.NdJ("loadMore",function(){return c.onLoadMore()}),e.qZA()),2&o&&e.Q6J("productId",c.productId)("products",c.products)},dependencies:[p.P]}),t})()}];let h=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[n.Bz.forChild(l),n.Bz]}),t})();var g=r(4466);let y=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[d.ez,h,g.m]}),t})()}}]);