class Incident < ApplicationRecord
	# Extensions
  extend FriendlyId
  friendly_id :slug

  include HasTagsList
  acts_as_taggable_array_on :tags
  has_tags_list :tags

  extend TimeSplitter::Accessors
  split_accessor :date, date_format: "%m/%d/%Y", time_format: "%I:%M %p %z"

  nilify_blanks
  
  # Scopes
  scope :by_recent,      -> { order(created_at: :desc) }
  scope :by_oldest,      -> { order(created_at: :asc) }
  scope :featured,       -> { where(featured: true) }
  
  # Validations
  validates :slug, uniqueness: {case_sensitive: false}, presence: true
  #validates :text, presence: true

  CATEGORIES = [
    "Got pulled over in a vehicle",
    "Got stopped on foot",
    "Witnessed the police",
    "Called the police",
    "Other",
  ]

  OFFICER_RACES = [
    "Asian",
    "Black/African",
    "Caucasian/White",
    "Latinx",
    "Middle Eastern",
    "Multiracial",
    "Native American",
    "Pacific Islander",
    "South Asian",
    "Not Sure"
  ]

  OFFICER_GENDERS = [
    "Man",
    "Woman",
    "Other",
    "Not Sure"
  ]

  # Callbacks
  before_validation :ensure_slug, on: :create

  def ensure_slug
    if slug.blank?
      self.slug = loop do
        #slug = SecureRandom.urlsafe_base64(6).tr('1+/=lIO0_-', 'pqrsxyz')
        slug = "#{rand(1000..9999)}-#{rand(1000..9999)}"
        break slug unless Incident.where(slug: slug).exists?
      end
    end
  end

  def has_rating?
  	self.rating > 0
  end

  def rating=(value)
    value = 0 if value.blank?
    super
  end

  def officer_race_display
    if officer_race == "Not Sure"
      return nil
    end
    return officer_race
  end
end
