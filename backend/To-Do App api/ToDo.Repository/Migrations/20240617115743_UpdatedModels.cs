using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDo.Repository.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "userData");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "userData",
                newName: "UserName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "userData",
                newName: "Email");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "userData",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
