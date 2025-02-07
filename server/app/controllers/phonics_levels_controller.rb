class PhonicsLevelsController < ApplicationController
  def index
    @phonic_levels = PhonicsLevel.all

    render json: @phonic_levels
  end
end
