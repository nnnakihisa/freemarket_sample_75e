class ApplicationController < ActionController::Base
  before_action :basic_auth, if: :production?
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == Rails.application.credentials[:basic_auth][:user] &&
      password == Rails.application.credentials[:basic_auth][:pass]
    end
  end

  def production?
    Rails.env.production?
  end

  def configure_permitted_parameters  
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, person_info_attributes: [:family_name, :first_name, :family_kana, :first_kana, :birth_date], address_attributes: [:family_name, :first_name, :family_kana, :first_kana, :zipcode, :city, :street, :apartment, :prefecture_id]])
  end

end
