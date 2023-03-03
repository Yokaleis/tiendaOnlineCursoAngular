import { Component, OnInit } from '@angular/core';

import { User } from "../../../models/users.models";

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css']
})
export class NavegationComponent implements OnInit {

  profile: User | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
