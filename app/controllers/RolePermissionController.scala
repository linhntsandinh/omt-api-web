package controllers

import akka.actor.ActorSystem
import javax.inject.Inject
import models.{RoleData, RoleForm, RolePermissionData, RolePermissionForm}
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{RolePermissionService, RoleService}

import scala.concurrent.ExecutionContext

class RolePermissionController@Inject()(actorSystem: ActorSystem, rolePermissionService: RolePermissionService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def insert = Action.async(parse.json[RolePermissionForm]) { request =>
    rolePermissionService.insert(request.body)
  }

  def update = Action.async(parse.json[RolePermissionData]) { request =>
    rolePermissionService.update(request.body)
  }

  def delete (id: Int)= Action.async{
    rolePermissionService.deleteByRoleId(id)
  }
}
