import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'Change la couleur de ton bracelet !'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption((option) => {
					return option.setRequired(true).setName('couleur').setDescription('💙 ou 💔').addChoices(
						{
							name: 'Bracelet Bleu 💙',
							value: '893457059352289310'
						},
						{ name: 'Bracelet Rouge 💔', value: '893456850069123092' }
					);
				})
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const roleId = interaction.options.getString('couleur')!;
		const role = interaction.guild?.roles.cache.get(roleId);
		if (!role) {
			return interaction.reply({ content: "Ce role n'a pas été trouvé!", ephemeral: true });
		}
		if (roleId == '1159514743862734880') {
			interaction.guild?.members.cache.get(interaction.member!.user.id)?.roles.remove('1159514701126975639');
		} else {
			interaction.guild?.members.cache.get(interaction.member!.user.id)?.roles.remove('1159514743862734880');
		}
		interaction.guild?.members.cache.get(interaction.member!.user.id)?.roles.add(role);
		return interaction.reply({ content: `${roleId == '1159514743862734880' ? '💙' : '💔'}`, ephemeral: true });
	}
}
