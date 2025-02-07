class WordPartsController < ApplicationController
  def index
    @phonics_level = PhonicsLevel.find(params[:phonics_level_id])

    render json: @phonics_level.word_parts
  end
end
