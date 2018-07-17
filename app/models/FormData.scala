package models

import play.api.libs.json.Json

case class LoginForm(username: String, password: String)
object LoginForm {
  implicit val reader = Json.reads[LoginForm]
}

case class UserForm(id: Option[Int], username: String, password: String, email: String, avatar: String, holidayRemaining: Float, status: Int)
object UserForm {
  implicit val reader = Json.reads[UserForm]
  implicit val writer = Json.writes[UserForm]
}

case class ProfileForm(id: Option[Int], user_id: Int, full_name: String, phone_number: String, birth_date: String, address: String, job_title_id: Int, job_position_id: Int, status: Int, join_date: String, gender: Int)
object ProfileForm {
  implicit val reader = Json.reads[ProfileForm]
  implicit val writer = Json.writes[ProfileForm]
}



