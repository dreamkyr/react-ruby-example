class SuggestedTag < ApplicationRecord

	# Scopes
	scope :between_rating,  -> (min_rating, max_rating) { where("min_rating >= ? and max_rating <= ?", min_rating, max_rating) }

	# Validations
  validates :name, presence: true
  validates :min_rating, presence: true
  validates :max_rating, presence: true
  validate :max_is_greater_than_min

  def max_is_greater_than_min
    if min_rating.present? && max_rating.present? && max_rating < min_rating
      errors.add(:max_rating, "Max Rating must be greater than or equal to Min rating")
    end
  end

	def self.create_tags(tags, min_rating, max_rating)
		tags.each do |tag|
			SuggestedTag.create(name:tag, min_rating: min_rating, max_rating: max_rating)
		end
	end

	def self.seed
		SuggestedTag.create_tags(["Disrespected","Scared","Embarrassed","Intimidated","Angry","Ignored"], 1, 2)
		SuggestedTag.create_tags(["Disappointed","Relieved","Ignored","Satisfied","Frustrated"], 3, 3)
		SuggestedTag.create_tags(["Protected","Relieved","Safe","Comforted","Heard"], 4, 5)
	end
end
