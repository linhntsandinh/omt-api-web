package controllers

import akka.actor.ActorSystem
import javax.inject.Inject
import models.{RoleData, RoleForm}
import play.api.mvc.{AbstractController, ControllerComponents}
import services.RoleService
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

class RoleController @Inject()(actorSystem: ActorSystem, role : RoleService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def insert = Action.async(parse.json[RoleForm]) { request =>
    role.insert(request.body)
  }

  def update = Action.async(parse.json[RoleForm]) { request =>
    role.update(request.body).map{x=>
      JS.OK("data" -> "update Success!!")
    }
  }

  def delete (id: Int)= Action.async{
    role.delete(id).map{x=>
      JS.OK("data" -> "delete Success!!")
    }
  }
}
