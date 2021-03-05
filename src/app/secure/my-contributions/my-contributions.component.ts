import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerProfileService } from '../member-contribution/customer-profile.service';
import { Contribution } from '../../shared/models/Contribution';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-my-contributions',
  templateUrl: './my-contributions.component.html',
  styleUrls: ['./my-contributions.component.scss']
})
export class MyContributionsComponent implements OnInit, AfterViewInit {

  memberContributions: Contribution [];
  displayedColumns: string[] = ['amount', 'transactionId', 'createdDate'];
  dataSource: MatTableDataSource<Contribution>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private customerProfileService: CustomerProfileService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this
      .customerProfileService
      .getContributions()
      .subscribe(contributions => {
        this.memberContributions = contributions;
        this.dataSource = new MatTableDataSource(contributions);
        this.dataSource.paginator = this.paginator;
      });
  }

}
