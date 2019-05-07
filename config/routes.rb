Rails.application.routes.draw do
  
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :incidents do
    resources :build, controller: 'incidents/build', except: [:new, :create, :destroy]
  end
  
	get "/about",         to: "pages#about",       as: :about
  get "/contact",       to: "pages#contact",     as: :contact
  
  namespace :api, :defaults => {:format => :json} do
    namespace :v1 do
      resources :tags, only: [:index] do
        collection do
          get :suggested
        end
      end
    end
  end

  root to: "pages#index"
end
