package controllers

import akka.actor.ActorSystem
import be.objectify.deadbolt.scala.DeadboltActions
import javax.inject.{Inject, Singleton}
import models.ProfileForm
import play.api.mvc.{AbstractController, ControllerComponents}
import services.ProfileService
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProfileController  @Inject()(deadbolt: DeadboltActions, actorSystem: ActorSystem, profileService: ProfileService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {

  def insert = Action.async(parse.json[ProfileForm]) { request =>
    profileService.insert(request.body)
    Future(Redirect(routes.UserController.index))
  }

  def update = Action.async(parse.json[ProfileForm]) { request =>
    profileService.update(request.body)
    Future(JS.OK("value" -> "update Success!!"))
  }

  def delete (id: Int)= Action.async{
    profileService.delete(id)
    Future(JS.OK("value" -> "delete Success!!"))
  }

}
