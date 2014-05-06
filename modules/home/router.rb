require 'sinatra'
require 'slim'
require 'coffee-script'
require 'stylus'
require 'stylus/tilt'

class Stik::Home < Sinatra::Base
  get '/assets/:file.css' do |file|
    stylus "stylesheets/#{file.to_sym}".to_sym
  end

  get '/?' do
    slim :home
  end
end
