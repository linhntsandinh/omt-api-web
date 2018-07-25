package services

import javax.inject.Inject
import models.{DRole, RoleData, RoleForm}
import play.api.mvc.Result

import scala.concurrent.{ExecutionContext, Future}
import utils.JS

class RoleService @Inject()(role: DRole){
  def delete(id: Int): Future[Result] = role.deleteById(id)
  def insert(roleForm: RoleForm): Future[Result] = {
    val roleData = new RoleData(1,roleForm.code,roleForm.name,Some(System.currentTimeMillis()/1000),null)
    role.insert(roleData)
    Future(JS.OK("data" -> "delete Success!!"))
  }
  def update(roleData: RoleData): Future[Result] = {
    role.update(roleData)
  }
}
