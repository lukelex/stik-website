require 'require_all'

module Stik ; end

require_all './modules/**/*.rb'

run Stik::Home
