import {FlowRouter} from 'meteor/kadira:flow-router'
import React from 'react'
import { mount } from 'react-mounter'

import { MainLayout } from '../ui/layouts/MainLayout.jsx'
import Players from '../ui/players/Players.jsx'
import PlayerForm from '../ui/players/PlayerForm.jsx'
import PlayerSingle from '../ui/players/PlayerSingle.jsx'
import PlayerEdit from '../ui/players/PlayerEdit.jsx'

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<Players />)
    })
  }
})

FlowRouter.route('/player/add', {
  action() {
    mount(MainLayout, {
      content: (<PlayerForm />)
    })
  }
})

FlowRouter.route('/player/edit/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<PlayerEdit id={params.id}/>)
    })
  }
})

FlowRouter.route('/player/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<PlayerSingle id={params.id}/>)
    })
  }
})
