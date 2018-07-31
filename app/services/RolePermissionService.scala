
package services

import javax.inject.Inject
import models._
import play.api.mvc.Result
import utils.JS

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class RolePermissionService @Inject()(rolePermission: RolePermission){
  def deleteByRoleId(roleId: Int): Future[Result] = rolePermission.deleteByRoleId(roleId)
  def insert(rolePermissionForm: RolePermissionForm): Future[Result] = {
    val rolePermissionData = new RolePermissionData(1,rolePermissionForm.roleId,rolePermissionForm.permissionId)
    rolePermission.insert(rolePermissionData)
    Future(JS.OK("data" -> "insert Success!!"))
  }
  def update(rolePermissionData: RolePermissionData): Future[Result] = {
    rolePermission.update(rolePermissionData)
  }
}
