class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def logout
  end

  def card
  end

end
