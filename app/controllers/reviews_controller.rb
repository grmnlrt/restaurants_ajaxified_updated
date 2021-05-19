class ReviewsController < ApplicationController
  def create
    @restaurant = Restaurant.find(params[:restaurant_id])
    @review = Review.new(review_params)
    @review.restaurant = @restaurant

    respond_to do |format|
      format.html do
        if @review.save
          redirect_to restaurant_path(@restaurant, anchor: "review-#{@review.id}")
        else
          render 'restaurants/show'
        end
      end
      format.json do
        @review.save
        render json: {
          review: render_to_string(partial: 'restaurants/review.html', locals: { review: @review }),
          form: render_to_string(partial: 'reviews/form.html', locals: { restaurant: @restaurant, review: Review.new })
        }
      end
    end
  end

  private

  def review_params
    params.require(:review).permit(:content)
  end
end
