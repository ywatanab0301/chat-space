class UsersController < ApplicationController

  def edit
  end

  def update
    if current_user.update(users_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%")
    respond_to do |format|
      format.html
      format.json
  end

  private
  def users_params
    params.require(:user).permit(:name, :email)
  end
end
