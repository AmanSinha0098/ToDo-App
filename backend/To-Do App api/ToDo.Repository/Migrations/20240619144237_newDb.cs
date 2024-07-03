using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDo.Repository.Migrations
{
    /// <inheritdoc />
    public partial class newDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tasks_userData_User_Id",
                table: "tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_userData",
                table: "userData");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "userData",
                newName: "Username");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "userData",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "userData",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedOn",
                table: "tasks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tasks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "tasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_userData",
                table: "userData",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tasks_userData_User_Id",
                table: "tasks",
                column: "User_Id",
                principalTable: "userData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tasks_userData_User_Id",
                table: "tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_userData",
                table: "userData");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "userData");

            migrationBuilder.DropColumn(
                name: "CompletedOn",
                table: "tasks");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tasks");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "tasks");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "userData",
                newName: "UserName");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "userData",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_userData",
                table: "userData",
                column: "UserName");

            migrationBuilder.AddForeignKey(
                name: "FK_tasks_userData_User_Id",
                table: "tasks",
                column: "User_Id",
                principalTable: "userData",
                principalColumn: "UserName",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
