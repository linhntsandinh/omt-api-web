package models

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.MySQLProfile.api._
import slick.jdbc.JdbcProfile
import javax.inject.Inject


class Profile @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                       (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val ProfileTable = TableQuery[ProfileTableDef]

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
