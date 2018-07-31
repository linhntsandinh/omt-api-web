package services

import javax.inject.Inject
import models.{LoginForm, User, UserData, UserForm}
import play.api.libs.json.Json
import play.api.mvc.Result
import utils.JS

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future


class UserService @Inject()(user: User) {

  def delete(id: Int): Future[Int] = user.delete(id)

  def insert(userForm: UserForm): Future[Int] = {
    val userData: UserData = new UserData(1, userForm.username, userForm.password, userForm.email, userForm.avatar, userForm.holidayRemaining, userForm.status, Some(System.currentTimeMillis() / 1000), Some(1), userForm.create_by, Some(1))
    user.insert(userData)
  }

  def update(userForm: UserForm): Future[Int] = {
    val userData: UserData = new UserData(userForm.id,
      userForm.username,
      userForm.password,
      userForm.email,
      userForm.avatar,
      userForm.holidayRemaining,
      userForm.status,
      null,
      Some(System.currentTimeMillis() / 1000),
      Some(1),
      Some(1))
    user.update(userData)
  }

  def login(loginForm: LoginForm): Future[Result] = {

    val userAuth = user.getAuthInfo(loginForm.username)
    userAuth.map {
      case Some(x) => {
        val js = Json.toJson(x)
        JS.OK("user_data" -> Json.toJson(x._1), "permission" -> Json.toJson(x._2))
      }
      case None => JS.KO("Sai tên đăng nhập hoặc mật khẩu!")
    }
  }

}
