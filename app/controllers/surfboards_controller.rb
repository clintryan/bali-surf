class SurfboardsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    @surfboards = Surfboard.all
  end

  def new
    @surfboard = Surfboard.new
  end

  def create
    @surfboard = Surfboard.new(surfboard_params)
    @surfboard.user = current_user
    if @surfboard.save
      # Change path later on
      redirect_to surfboards_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def surfboard_params
    params.require(:surfboard).permit(:category, :size, :price, :tail, :location, :image_url, images: [])
  end
end
