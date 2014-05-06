require 'sinatra'
require 'slim'
require 'coffee-script'
require 'stylus'
require 'stylus/tilt'

class Stik::Home < Sinatra::Base
  get '/vendor/*.js' do |file|
    send_file File.join(__dir__, "assets/vendor/#{file}.js")
  end

  get '/assets/stik.min.js' do
    send_file File.join(__dir__, "assets/stik.min.js")
  end

  get '/assets/*.*' do |file, ext|
    case ext
    when 'css'
      stylus File.read(File.join(__dir__, "assets/#{file}.styl"))
    when 'js'
      coffee File.read(File.join(__dir__, "assets/#{file}.coffee"))
    else
      fail 'file not found'
    end
  end

  get '/?' do
    slim :home
  end
end
