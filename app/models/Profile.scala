package models

import java.sql.Date

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.MySQLProfile.api._
import slick.jdbc.JdbcProfile
import javax.inject.Inject
import play.api.libs.json.Json

case class ProfileForm(id: Option[Int], user_id: Int, full_name: String, phone_number: String, birth_date: String, address: String, job_title_id: Int, job_position_id: Int, status: Int, join_date: String, gender: Int)
object ProfileForm {
  implicit val reader = Json.reads[ProfileForm]
  implicit val writer = Json.writes[ProfileForm]
}

case class ProfileData(id: Option[Int], user_id: Int, full_name: String, phone_number: String, birth_date: Date, address: String, job_title_id: Int, job_position_id: Int, status: Int, join_date: Date, gender: Int, created_at: Option[Long], updated_at: Option[Long], created_by: Option[Long], updated_by: Option[Long])
object ProfileData {
  implicit val reader = Json.reads[ProfileData]
  implicit val writer = Json.writes[ProfileData]
}
class ProfileTableDef(tag: Tag) extends Table[ProfileData](tag, "profiles") {
  def id = column[Option[Int]]("id", O.PrimaryKey, O.AutoInc)

  def user_id = column[Int]("user_id")

  def full_name = column[String]("full_name")

  def phone_number = column[String]("phone_number")

  def birth_date = column[Date]("birth_date")

  def address = column[String]("address")

  def job_title_id = column[Int]("job_title_id")

  def job_position_id = column[Int]("job_position_id")

  def status = column[Int]("status")

  def join_date = column[Date]("join_date")

  def gender = column[Int]("gender")

  def created_at = column[Option[Long]]("created_at")

  def updated_at = column[Option[Long]]("updated_at")

  def created_by = column[Option[Long]]("created_by")

  def updated_by = column[Option[Long]]("updated_by")

  override def * =
    (id, user_id, full_name, phone_number, birth_date, address, job_title_id, job_position_id, status, join_date, gender, created_at, updated_at, created_by, updated_by) <> ((ProfileData.apply _).tupled, ProfileData.unapply)
}

class Profile @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                       (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val ProfileTable = TableQuery[ProfileTableDef]

  def getProfile(id: Int): Future[Option[(ProfileData, JobPositionData, JobTitleData)]] = {
    val jobPosition = TableQuery[JobPositionDef]
    val jobTitle = TableQuery[JobTitleDef]
    val query = (ProfileTable join jobPosition on (_.job_position_id === _.id) join jobTitle on (_._1.job_title_id === _.id)).filter(_._1._1.id === id).result
    val rs = db.run(query)
    rs.map{
      list => {
        list.size match {
          case 0 => None
          case _ => {
            val ((profile, job_posistion),job_title) = list.head
            Some(profile, job_posistion, job_title)
          }
        }
      }
    }
  }

  def insert(profileData: ProfileData): Future[Int] = {
    db.run(ProfileTable += profileData)
  }

  def delete(profileId: Int) = {
    db.run(ProfileTable.filter(_.id === profileId).delete)
  }

  def update(profileData: ProfileData) = {
    val q = ProfileTable.filter(_.id === profileData.id)
      .map(p => (p.full_name, p.phone_number, p.birth_date, p.address, p.job_title_id, p.job_position_id, p.status, p.gender, p.updated_at))
      .update(profileData.full_name, profileData.phone_number, profileData.birth_date, profileData.address, profileData.job_title_id, profileData.job_position_id, profileData.status, profileData.gender, profileData.updated_at)
    db.run(q)
  }
}
