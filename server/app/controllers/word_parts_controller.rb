class WordPartsController < ApplicationController
  def index
    @phonics_level = PhonicsLevel.find(params[:phonics_level_id])

    render json: @phonics_level.word_parts
  end

  def update
    @word_part = WordPart.find(params[:id])

    if @word_part.update({ status: params[:status] })
      render json: @word_part
    else
      render json: { errors: @word_part.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
