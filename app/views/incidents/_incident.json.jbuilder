json.extract! incident, :id, :text, :slug, :rating, :created_at, :updated_at
json.url incident_url(incident, format: :json)
