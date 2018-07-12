package controllers

import akka.actor.ActorSystem
import be.objectify.deadbolt.scala.DeadboltActions
import javax.inject.Inject
import models.{UserForm, UserRoleData, UserRoleForm}
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{UserRoleService, UserService}
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

class UserRoleController  @Inject()(deadbolt: DeadboltActions, actorSystem: ActorSystem, userRoleService: UserRoleService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {

  def insert =Action.async(parse.json[UserRoleForm]) { request =>
    val x = userRoleService.insert(request.body)

    x.onComplete {
      rs => {
        println(rs)
      }
    }


    Future(Redirect(routes.UserController.index))
  }

  def update = Action.async(parse.json[UserRoleData]){request=>
    userRoleService.update(request.body)
    Future(JS.OK("value"->"update Success!!"))
  }
  def delete (id: Int)= Action.async{
    userRoleService.delete(id)
    Future(JS.OK("value"->"delete Success!!"))
  }

  def deleteByUserId (id: Int)= Action.async{
    userRoleService.deleteByUserId(id)
    Future(JS.OK("value"->"delete Success!!"))
  }

}
